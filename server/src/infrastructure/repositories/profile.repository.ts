import { UpdateProfileDto } from '../../domain/profile/dto/updateProfile.dto';
import {Profile } from '../../domain/profile/entities/profile.entity'
import sql from '../database/postgres'
import { supabase } from '../storage/supabase.storage';

  export async function updateProfile(userId: string, dto: UpdateProfileDto):Promise<UpdateProfileDto> {

  if (!dto.username || !dto.full_name) {
    throw new Error('username and full_name must be provided');
  }
  const res = await sql<Profile[]>`
    UPDATE profiles
    SET username = ${dto.username}, full_name = ${dto.full_name}
    WHERE id = ${userId}
    RETURNING id, username, full_name
  `;
  return res[0];
  }


  export async function uploadProfileAvatar(userId: string, file: Express.Multer.File) {
    const { data, error } = await supabase.storage.from('Avatar').upload(`avatars/${userId}/${file.originalname}`, file.buffer);
    if (error) throw error;
    return supabase.storage.from('Avatar').getPublicUrl(data.path).data.publicUrl;
  }


export async function getProfile(userId: string): Promise<Profile> {
  const res = await sql<Profile[]>`
    SELECT id, username, full_name, avatar_url
    FROM profiles
    WHERE id = ${userId}
  `;
  if (res.length === 0) {
    throw new Error('Profile not found');
  }
  return res[0];
}