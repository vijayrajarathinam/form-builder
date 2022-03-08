import DropDown from "../../commons/Dropdown";
import CheckBoxField from "./CheckBoxField";
import EmailField from "./EmailField";
import FileField from "./FileField";
import NumberField from "./NumberField";
import RadioField from "./RadioField";
import TextField from "./TextField";

export default function middleware({ type, ...props }) {
  if (type === "text") return <TextField {...props} />;
  if (type === "email") return <EmailField {...props} />;
  if (type === "file") return <FileField {...props} />;
  if (type === "dropdown") return <DropDown {...props} />;
  if (type === "number") return <NumberField {...props} />;
  if (type === "checkbox") return <CheckBoxField {...props} />;
  if (type === "radio") return <RadioField {...props} />;

  return <div className="w-full bg-transparent" />;
}
