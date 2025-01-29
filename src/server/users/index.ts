'use server';

import { z } from "zod";
import { db } from "../db";
import { validatedActionWithUser } from "../auth/middleware";
import { redirect, RedirectType } from 'next/navigation';


const deleteUserSchema = z.object({
    id: z.string().min(20).max(28),
});

export const deleteUserAction = validatedActionWithUser(deleteUserSchema, async (data, _formData) => {
    const { id } = data;

    await new Promise((resolve) => setTimeout(resolve, 250));

    try {
        await db.user.delete({
            where: {
                id,
            },
        });


    } catch (error) {
        console.error(error);
        return { error: 'Failed to delete user' };
    }

    redirect('/test?delete=true', RedirectType.replace);

});
