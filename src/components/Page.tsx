import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  subTitle?: string;
  action?: React.ReactNode;
}>;

export const Page: React.FunctionComponent<Props> = ({
  children,
  title,
  subTitle,
  action,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center">
        <div className="mb-3 mr-auto">
          <h2 className="text-xl">{title}</h2>
          {subTitle && <p>{subTitle}</p>}
        </div>
        {action}
      </div>
      <div className="bg-white rounded-lg px-3 py-3 shadow">{children}</div>
    </div>
  );
};
