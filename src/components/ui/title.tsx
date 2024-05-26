import { FC } from "react";
import { Typography } from "./typography/typography";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const Title: FC<IProps> = ({ title, ...props }) => {
  return (
    <div className="" {...props}>
      <Typography
        variant="text-54"
        className="text-[--primary-black] font-bold"
      >
        {title}
      </Typography>
    </div>
  );
};
