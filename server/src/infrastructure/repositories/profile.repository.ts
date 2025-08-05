import { UpdateProfileDto } from '../../domain/profile/dto/updateProfile.dto';
import { Profile } from '../../domain/profile/entities/profile.entity';
import { ValidationException, NotFoundException, StorageException, DatabaseException } from '../../common/exceptions';
import sql from '../database/postgres';
import { supabase } from '../storage/supabase.storage';

export async function updateProfile(
  userId: string,
  dto: UpdateProfileDto
): Promise<UpdateProfileDto> {
  if (!dto.username || !dto.full_name) {
    throw new ValidationException('username and full_name must be provided');
  }

  try {
    const res = await sql<Profile[]>`
      UPDATE
        profiles
      SET
        username = ${dto.username},
        full_name = ${dto.full_name}
      WHERE
        id = ${userId}
      RETURNING
        id,
        username,
        full_name
    `;

    if (res.length === 0) {
      throw new NotFoundException('Profile not found');
    }

    return res[0];
  } catch (error) {
    if (error instanceof ValidationException || error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to update profile: ${error}`);
  }
}

export async function uploadProfileAvatar(
  userId: string,
  file: Express.Multer.File
) {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`profile/avatars/${userId}/${file.originalname}`, file.buffer);

    if (error) {
      throw new StorageException(`Failed to upload avatar: ${error.message}`);
    }

    const avatarUrl = supabase.storage.from('avatars').getPublicUrl(data.path)
      .data.publicUrl;
    console.log('Avatar uploaded:', avatarUrl);

    await sql`
      UPDATE
        profiles
      SET
        avatar_url = ${avatarUrl}
      WHERE
        id = ${userId}
    `;

    return avatarUrl;
  } catch (error) {
    if (error instanceof StorageException) {
      throw error;
    }
    throw new DatabaseException(`Failed to update avatar URL: ${error}`);
  }
}

export async function getProfile(userId: string): Promise<Profile> {
  try {
    const res = await sql<Profile[]>`
      SELECT
        id,
        username,
        full_name,
        avatar_url
      FROM
        profiles
      WHERE
        id = ${userId}
    `;

    if (res.length === 0) {
      throw new NotFoundException('Profile not found');
    }

    return res[0];
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new DatabaseException(`Failed to get profile: ${error}`);
  }
}
