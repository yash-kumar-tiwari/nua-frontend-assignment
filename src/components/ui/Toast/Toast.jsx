import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotification,
  clearNotification,
} from "../../../features/ui/uiSlice";
import { XIcon, CheckIcon, RefreshIcon } from "../Icon/icons";
import { cx } from "../../../utils/cx";
import styles from "./Toast.module.scss";

const AUTO_DISMISS_MS = 4000;

const ICONS = {
  success: CheckIcon,
  error: RefreshIcon,
  info: null,
  warning: null,
};

export default function Toast() {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  useEffect(() => {
    if (notification) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [notification, dismiss]);

  if (!notification) return null;

  const Icon = ICONS[notification.type] || null;

  return (
    <div
      className={cx(styles.toast, styles[notification.type])}
      role="alert"
      aria-live="polite"
    >
      {Icon && (
        <span className={styles.icon}>
          <Icon size={18} strokeWidth={2} />
        </span>
      )}
      <p className={styles.message}>{notification.message}</p>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        <XIcon size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
