<?php

namespace App\Utilities;

use Exception;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Intervention\Image\Image as ImageIntrv;

class StorageFile
{
    static function uploadImage(object $image, string $name, string $path)
    {
        try {
            $image = Image::make($image);

            Storage::put($path . $name, $image->encode());
        } catch (\Exception $e) {
            return new Exception("Gagal Mengupload Gambar");
        }
    }

    static function uploadFile(object $file, string $name, string $path)
    {
        try {
            return Storage::put($path . $name, $file);
        } catch (\Exception $e) {
            return new Exception("Gagal Mengupload Gambar");
        }
    }

    static function resizeAspectRatio(object $image, string $name, string $path, int $width = 300, int $height = null)
    {
        try {
            $image = Image::make($image)->resize($width, $height, function($constraint) {
                $constraint->aspectRatio();
            });

            Storage::put($path . $name, $image->encode());
        } catch (\Exception $e) {
            return new Exception("Gagal Mengupload Gambar");
        }
    }

    static function check(string $name, string $path)
    {
        return Storage::exists($path . $name);
    }

    static function delete(string $name, string $path)
    {
        try {
            Storage::delete($path . $name);
        } catch (\Exception $e) {
            throw new Exception('Gagal Menghapus Gambar');
        }
    }
}
