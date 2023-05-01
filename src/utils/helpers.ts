import { toast } from "react-toastify";

export const toKebabCase = (str: string) =>
  (str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.toLowerCase())
      .join("-")) ||
  str;

export const sanitizeObject = (obj: object) => {
  const objClone = { ...obj };

  Object.keys(objClone).forEach((key) => {
    // @ts-expect-error
    if (typeof objClone[key] === "number" && isNaN(objClone[key])) {
      // @ts-expect-error
      objClone[key] = null;
    }
  });

  return objClone;
};

export const bgClasses = (index: number) => {
  const classes = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
  ];
  return classes[index];
};

export const showToast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  toast(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    type: type,
  });
};
