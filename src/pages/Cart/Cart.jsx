import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openCartDrawer } from "../../features/ui/uiSlice";

export default function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openCartDrawer());
  }, [dispatch]);

  return null;
}
