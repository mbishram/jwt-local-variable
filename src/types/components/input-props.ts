import { HTMLProps } from "react";

type Props = {
	fullWidth?: boolean;
};

export type InputProps = HTMLProps<HTMLInputElement> & Props;
export type TextAreaProps = HTMLProps<HTMLTextAreaElement> & Props;
