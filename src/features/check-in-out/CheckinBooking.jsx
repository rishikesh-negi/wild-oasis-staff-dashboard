import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../../hooks/useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const Instruction = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0 1.2rem;
  text-align: right;
  letter-spacing: 0.4px;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState();
  const [hasAddedBreakfast, setHasAddedBreakfast] = useState(false);

  const { isLoadingSettings, settings } = useSettings();

  const { booking, isLoading } = useBooking();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (hasAddedBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={hasAddedBreakfast}
            onChange={() => {
              setHasAddedBreakfast((val) => !val);
              setConfirmPaid(false);
            }}
            id="breakfast">
            Add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirmation) => !confirmation)}
          id="confirm">
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(
            hasAddedBreakfast ? totalPrice + optionalBreakfastPrice : totalPrice
          )}{" "}
          {hasAddedBreakfast
            ? `(${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : ""}
        </Checkbox>
      </Box>

      {confirmPaid && (
        <Instruction>
          Please make sure the payment has been received before confirming a
          check-in. <br />
          Click "Undo" to undo the payment confirmation.
        </Instruction>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button
          variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}>
          {confirmPaid ? "Undo" : "Back"}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
