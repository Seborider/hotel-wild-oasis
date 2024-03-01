import {
  Session,
  User,
  UserAttributes,
  WeakPassword,
} from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export interface LoginPromise {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
}

interface SignupProps extends UserAttributes {
  fullName?: string;
  avatar?: string | File;
}

export async function signup({ fullName, email, password }: SignupProps) {
  if (!email || !password) throw new Error("Email an password are required.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({
  email,
  password,
}: UserAttributes): Promise<LoginPromise> {
  if (!email || !password) throw new Error("Email an password are required.");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: SignupProps) {
  // Initialize an object to hold the data for updateUser
  let updatePayload: {
    password?: string;
    data?: { fullName?: string; avatar?: string };
  } = {};

  // Update password directly if provided
  if (password) updatePayload.password = password;

  // Update fullName in the data object if provided
  if (fullName) {
    updatePayload.data = { ...(updatePayload.data ?? {}), fullName };
  }

  // Call updateUser with the constructed payload
  const { data, error } = await supabase.auth.updateUser(updatePayload);

  if (error) throw new Error(error.message);

  // If no avatar is provided, return the updated user data immediately
  if (!avatar) return data;

  // If avatar is provided, proceed with avatar upload and update
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update the user's avatar URL after successful upload
  updatePayload = {
    data: {
      ...(updatePayload.data ?? {}),
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  };

  // Perform the final update to set the avatar URL in the user's profile
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser(updatePayload);

  if (updateError) throw new Error(updateError.message);

  return updatedUser;
}
