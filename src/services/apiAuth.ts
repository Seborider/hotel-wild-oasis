import {
  Session,
  User,
  UserAttributes,
  WeakPassword,
} from "@supabase/supabase-js";
import supabase from "./supabase";

export interface LoginPromise {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
}

interface SignupProps extends UserAttributes {
  fullName?: string;
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

  // const { data: profileData, error: profileError } = await supabase
  //   .from("users")
  //   .insert([{ user_id: user.id, full_name: fullName }]);

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
