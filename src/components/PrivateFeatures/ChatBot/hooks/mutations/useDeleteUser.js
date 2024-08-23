import { useRef } from "react";
import { useGlobal } from "..";
import { userService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteUser = () => {
  const argsRef = useRef({});
  const { createAlert } = useGlobal();
  return useMutation(
    ({ userId }) => {
      argsRef.current = { userId };
      return userService.deleteUser({ userId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery("getUsers", (users) => {
            return {
              ...users,
              data: users.data.filter(
                (user) => user.id !== argsRef.current.userId
              ),
            };
          });
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
