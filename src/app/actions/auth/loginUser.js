"use server";

import bcrypt from "bcrypt"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export const loginUser = async (payload) => {

    const { email, password } = payload;

    const userCollection = dbConnect(collectionNameObj.userCollection)
    const user = await userCollection.findOne({ email })

    if (!user) return null
    const isPasswordOK = bcrypt.compare(user.password, password)
    if (!isPasswordOK) return null

    return user;
}