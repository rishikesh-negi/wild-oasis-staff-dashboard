import { useCheckout } from "../../hooks/useCheckout";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="secondary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}>
      {isCheckingOut ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
