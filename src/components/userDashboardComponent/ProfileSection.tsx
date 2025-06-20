"use client";

import { useAuth } from "@/hooks/useAuth";
import { Camera, Loader2, Shield } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { uploadProfilePhotoAction } from "@/actions";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";

const ProfileSection = () => {
  const { user, token, refreshUserData } = useAuth();

  const initialState = { type: "", message: "" };
  type UploadState = { type: string; message: string };

  const uploadProfilePhotoActionWrapper = async (
    prevState: UploadState,
    formData: FormData
  ) => {
    const result = await uploadProfilePhotoAction(prevState, formData);

    if (result.type === "success") {
      refreshUserData?.();
    }

    return result;
  };

  const [photoState, photoAction, isPhotoUploading] = useActionState(
    uploadProfilePhotoActionWrapper,
    initialState
  );

  if (!user) {
    return null;
  }

  // Get user initials for avatar placeholder if no photo is set
  const getInitials = () => {
    if (!user?.name) return "?";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className=" flex flex-col items-center">
      <div className="relative group mb-4">
        <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-[#f0ebf4] border-6 border-[#937195]/30 shadow-xl transition-transform duration-300 group-hover:scale-105">
          {user?.profile_photo_path ? (
            <Image
              src={`https://inputoutput.be/storage/${user.profile_photo_path}`}
              alt="Profile-photo"
              width={208}
              height={208}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#553a5c] to-[#937195] text-white text-6xl font-bold">
              {getInitials()}
            </div>
          )}
        </div>

        <form action={photoAction} className="absolute inset-0">
          <input type="hidden" name="token" value={token || ""} />
          <label
            htmlFor="file"
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {isPhotoUploading ? (
                <Loader2 className="text-white h-12 w-12 animate-spin" />
              ) : (
                <>
                  <Camera className="text-white h-12 w-12 mb-3" />
                  <span className="text-white text-base font-medium bg-black/30 px-4 py-2 rounded-full">
                    Change Photo
                  </span>
                </>
              )}
            </div>
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            multiple={false} // explicitly disallow multiple files
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 5 * 1024 * 1024) {
                alert("Image must be less than 5MB.");
                return;
              }
              if (file) {
                e.target.form?.requestSubmit();
              }
            }}
            className="hidden"
          />
        </form>
      </div>

      {photoState.type && (
        <div
          className={cn(
            " w-full p-5 rounded-xl text-center transition-all duration-300 shadow-md text-lg font-medium",
            photoState.type === "success"
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-700 border border-red-100"
          )}
        >
          {photoState.message}
        </div>
      )}

      <div className="w-full p-4 sm:p-8 rounded-xl bg-[#fbf9fc] shadow-md border border-gray-100 mb-4 mt-2">
        <div className="flex flex-col space-y-4 sm:space-y-6">
          {/* Name field */}
          <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-3 items-start sm:items-center">
            <span className="text-gray-500 font-medium text-base sm:text-lg mb-1 sm:mb-0">
              Name:
            </span>
            <div className="w-full">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#553a5c]">
                  {user?.name}
                </h3>
                {user?.is_admin === 1 && (
                  <span className="inline-flex items-center bg-gradient-to-r from-[#553a5c] to-[#937195] text-white px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Email field */}
          <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-3 items-start sm:items-center">
            <span className="text-gray-500 font-medium text-base sm:text-lg mb-1 sm:mb-0">
              Email:
            </span>
            <p className="text-base sm:text-lg text-gray-700 break-words w-full">
              {user?.email}
            </p>
          </div>

          {/* Member since field */}
          <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-3 items-start sm:items-center">
            <span className="text-gray-500 font-medium text-base sm:text-lg mb-1 sm:mb-0">
              Member since:
            </span>
            <p className="text-base sm:text-lg text-gray-600">
              {new Date(user?.created_at || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
        <EditProfile />

        <DeleteProfile />
      </div>
    </div>
  );
};

export default ProfileSection;
