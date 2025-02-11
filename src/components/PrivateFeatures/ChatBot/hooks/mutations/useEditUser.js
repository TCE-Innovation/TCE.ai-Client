import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { userService } from "../../services";
import useMutation from "../useMutation";

export const useEditUser = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});
  return useMutation(
    ({ userId, role }) => {
      argsRef.current = { userId };
      return userService.editUser({ userId, role });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          createAlert({ message: newData.message, type: "success" });
          const { user: updatedUser } = newData.data;
          if (!updatedUser) return;
          try {
            updateQuery("getUsers", (users) => {
              return {
                ...users,
                data: users.data.map((user) => {
                  if (user.id === argsRef.current.userId) {
                    return {
                      ...user,
                      role: updatedUser.role,
                    };
                  }
                  return user;
                }),
              };
            });
          } catch (err) {
            console.error(err);
          }
        }
      },
    }
  );
};
