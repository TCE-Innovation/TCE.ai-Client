import { useGlobal } from "..";
import { userService } from "../../services";
import useMutation from "../useMutation";

export const useAddUser = () => {
  const { createAlert } = useGlobal();
  return useMutation(({ userData }) => userService.addUser({ userData }), {
    onSuccess: (newData, { updateQuery }) => {
      if (newData.success) {
        const { user } = newData.data;
        updateQuery("getUsers", (users) => {
          return {
            ...users,
            data: [user, ...users.data],
          };
        });
        return createAlert({ message: newData.message, type: "success" });
      }
      createAlert({ message: newData.message, type: "danger" });
    },
  });
};
