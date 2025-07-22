import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

const FriendCard = ({ friend, onUnfriend, isUnfriending }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleUnfriend = (e) => {
    e.preventDefault();
    setShowMenu(false);
    onUnfriend();
  };

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="avatar size-12 flex-shrink-0">
              <img src={friend.profilePic} alt={friend.fullName} className="object-cover" />
            </div>
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
          </div>
          <div className="relative">
            <button 
              onClick={handleMenuClick}
              className="btn btn-ghost btn-sm btn-square"
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-base-100 rounded-box shadow-lg z-10 border border-base-300">
                <ul className="menu menu-sm p-2">
                  <li>
                    <button 
                      onClick={handleUnfriend}
                      className="text-error hover:bg-error/10"
                      disabled={isUnfriending}
                    >
                      {isUnfriending ? 'Removing...' : 'Remove Friend'}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
