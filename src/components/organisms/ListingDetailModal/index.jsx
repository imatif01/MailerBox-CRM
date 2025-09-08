import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Grid from 'components/atoms/Grid';
import InfoCard from 'components/molecules/InfoCard';
import DetailsCard from 'components/molecules/DetailsCard';
import { formatCurrency } from 'helpers/common';

function ListingDetailModal({ listing }) {
  return (
    <DetailsCard gray>
      <Grid sm={2} gap={20}>
        <InfoCard title="Name" value={listing?.name ? listing?.name : 'N/A'} $unStyled />
        <InfoCard
          title="Location"
          value={`${listing.location.address}, ${listing.location.city}, ${listing.location.state}, ${listing.location.country}`}
          $unStyled
        />
        <InfoCard
          title="Categories"
          value={listing?.categories?.map(({ title }) => title).join(', ') || 'N/A'}
          $unStyled
        />
        <InfoCard
          title="Amenities"
          value={listing?.amenities?.map(({ title }) => title).join(', ') || 'N/A'}
          $unStyled
        />
        <InfoCard
          title="Price per night"
          value={formatCurrency(listing?.pricePerNight, listing?.currency) || 'N/A'}
          $unStyled
        />
        <InfoCard title="type" value={listing?.type ? listing?.type : 'N/A'} $unStyled />
        <InfoCard title="status" value={listing?.status ? listing?.status : 'N/A'} $unStyled />
        <InfoCard title="Approval Status" value={listing?.approvalStatus || 'N/A'} $unStyled />
        <InfoCard title="Currency" value={listing?.currency?.label || 'N/A'} $unStyled />
        <InfoCard
          title="Listed By"
          value={listing?.listedBy?.fullName ? listing?.listedBy?.fullName : 'ADMIN'}
          $unStyled
        />
        <InfoCard
          title="Min nights"
          value={listing?.minNumberOfNightsAllowed ? listing?.minNumberOfNightsAllowed : 'N/A'}
          $unStyled
        />
        <InfoCard
          title="Max night"
          value={listing?.maxNumberOfNightsAllowed ? listing?.maxNumberOfNightsAllowed : 'N/A'}
          $unStyled
        />
        <InfoCard title="Max guests" value={listing?.maxGuests ? listing?.maxGuests : 'N/A'} $unStyled />
        <InfoCard title="No. of Bedrooms" value={listing?.noOfBedrooms || 'N/A'} $unStyled />
        <InfoCard title="No. of Bathrooms" value={listing?.noOfBathrooms || 'N/A'} $unStyled />
        <InfoCard title="Slug" value={listing?.slug || 'N/A'} $unStyled />

        <InfoCard title="Rules" value={listing?.rules?.map(rule => rule).join(', ') || 'N/A'} $unStyled />
        <InfoCard
          title="Cancellation Policy"
          value={listing?.cancellationPolicy?.map(policy => policy).join(', ') || 'N/A'}
          $unStyled
        />

        <InfoCard
          title="Late Check-in"
          value={
            listing?.lateCheckIn?.isAvailable
              ? `Available (${formatCurrency(listing?.lateCheckIn?.fee, listing?.currency)})`
              : 'N/A'
          }
          $unStyled
        />
        <InfoCard
          title="Champagne"
          value={
            listing?.champagne?.isAvailable
              ? `Available (${formatCurrency(listing?.champagne?.fee, listing?.currency)})`
              : 'N/A'
          }
          $unStyled
        />
        <InfoCard
          title="Parking"
          value={
            listing?.parking?.isAvailable
              ? `Available (${formatCurrency(listing?.parking?.fee, listing?.currency)})`
              : 'N/A'
          }
          $unStyled
        />
        <InfoCard
          title="Room Cleaning"
          value={
            listing?.roomCleaning?.isAvailable
              ? `Available (${formatCurrency(listing?.roomCleaning?.fee, listing?.currency)})`
              : 'N/A'
          }
          $unStyled
        />
      </Grid>
      <InfoCard title="description" value={listing?.description ? listing?.description : 'N/A'} $unStyled />
    </DetailsCard>
  );
}
export default ListingDetailModal;
