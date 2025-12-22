import React from "react";
import Typography from "../../ui/Typography";

interface HeaderUserProps {
  email: string;
  avatarUrl?: string;
}

const HeaderUser: React.FC<HeaderUserProps> = ({ email, avatarUrl }) => {
  return (
    <div className="flex items-center gap-3">
      <Typography variant="body" color="primary">
        {email}
      </Typography>
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-full h-full rounded-full"
          />
        ) : (
          <span>{email.charAt(0).toUpperCase()}</span>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;
