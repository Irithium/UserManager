import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export const handleArrow = (header, column, order) => {
  if (header === column) {
    if (order === "desc")
      return <TiArrowSortedDown className="fill-dim_gray-100 opacity-90" />;
    return <TiArrowSortedUp className="fill-dim_gray-100 opacity-90" />;
  } else return;
};
