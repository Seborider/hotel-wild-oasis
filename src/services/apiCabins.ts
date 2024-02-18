import supabase, { supabaseUrl } from "./supabase.ts";
import { CabinType } from "../interfaces.ts";

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as CabinType[];
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return;
}

export async function createCabin(newCabin: CabinType) {
  let imageName;
  let fileToUpload: File | null = null;

  if (typeof newCabin.image === "string") {
    imageName = newCabin.image;
  } else if (newCabin.image instanceof File) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
    fileToUpload = newCabin.image;
  } else {
    throw new Error("Invalid image format");
  }

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (fileToUpload) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, fileToUpload);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", newCabin.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created",
      );
    }
  }

  return data as CabinType[];
}
