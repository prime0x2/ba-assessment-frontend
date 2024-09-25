import { App } from "antd";

const useToast = () => {
  const { message } = App.useApp();

  return message;
};

export default useToast;
