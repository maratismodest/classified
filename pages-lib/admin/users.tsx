'use client';
import { User } from '@prisma/client';
import React from 'react';

interface AdminUsersProps {
  users: User[];
}

const AdminUsers = ({ users }: AdminUsersProps) => {
  return (
    <ul className="grid grid-cols-1 gap-1">
      {users.map(({ id, email, name, image }) => {
        return (
          <li
            key={id}
            className="relative grid grid-cols-3 items-center rounded-2xl border border-blue px-4 py-1"
          >
            <span>{id}</span>
            <span className="truncate">{email}</span>
            <span className="truncate">{name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminUsers;
