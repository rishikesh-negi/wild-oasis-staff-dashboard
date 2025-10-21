import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../../hooks/useCheckout";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "../../hooks/useDeleteBookings";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}>
            Check out
          </Button>
        )}

        <Modal.Open opens="confirm-delete-booking">
          <Button
            variation="danger"
            icon={<HiTrash />}
            disabled={isDeletingBooking}
            onClick={() => deleteBooking(bookingId)}>
            Delete booking
          </Button>
        </Modal.Open>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      <Modal.Window name="confirm-delete-booking">
        <ConfirmDelete
          resourceName={`booking #${bookingId}`}
          onConfirm={() =>
            deleteBooking(bookingId, {
              onSuccess: () => navigate(-1),
            })
          }
          disabled={isDeletingBooking}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
