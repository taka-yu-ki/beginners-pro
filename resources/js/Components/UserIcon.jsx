import { Link } from "@inertiajs/react";

export default function UserIcon({ user, linkClassName = "", imgClassName = "", name }) {
  return (
    <Link 
      href={route("user.show", user.id)} 
      className={"flex " + linkClassName}
    >
      <img
        className={"rounded-full ring-2 ring-gray-50 " + imgClassName}
        src={user.image_url ? user.image_url : "/images/user_icon.png"}
        alt=""
      />
      {name && <div>{name}</div>}
    </Link>
  );
}