import { useEffect, useState } from "react";

interface IModal {
  umid: string,
  title: string,
  desc: string,
}

export const useModal = ({ umid, title, desc }: IModal) => {
  const [ modals ] = useState<IModal[]>();

  useEffect(() => {
    const uModal = modals?.find((modal: IModal ) => modal.umid === umid);
    if (typeof uModal !== "undefined") {
      console.log(`Modal ${umid} already exist`);
    }
  }, [ modals, umid ]);

  return null;
};
