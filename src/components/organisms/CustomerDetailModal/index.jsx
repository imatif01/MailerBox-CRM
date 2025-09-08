import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import Form, { useForm } from 'components/molecules/Form';
import Field from 'components/molecules/Field';
import Grid from 'components/atoms/Grid';
import InfoCard from 'components/molecules/InfoCard';
import DetailsCard from 'components/molecules/DetailsCard';
import customerService from 'services/customerService';
import Button from 'components/atoms/Button';
import Toast from 'components/molecules/Toast';
import { format } from 'date-fns';
import { CustomerInfo } from './CustomerDetail.style';
import CreditHistory from 'components/organisms/CreditHistory';

function CustomerDetailModal({ customer, onFinishedSuccess }) {
  const [form] = useForm();
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddButtonDisbaled, setIsAddButtonDisbaled] = useState(true);
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);

  const onSubmit = async values => {
    try {
      setIsLoading(true);
      const payload = {
        addedCredits: +values?.addedCredits,
        userId: customer?.id,
      };
      await customerService.updateCustomer(payload);
      Toast({
        type: 'success',
        message: 'User updated successfully',
      });
      onFinishedSuccess();
      form.resetForm();
      setUpdatedCustomer(prev => ({
        ...prev,
        remainingCredits: (prev.remainingCredits || 0) + payload.addedCredits,
      }));
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAddEnDisEvent = ({ addedCredits }) => setIsAddButtonDisbaled(Number(addedCredits) <= 0);

  return (
    <CustomerInfo>
      <div className="btn-wrap">
        <button className={`btn ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>
          General Info
        </button>
        <button className={`btn ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
          Credits History
        </button>
      </div>
      {tab === 0 && (
        <DetailsCard gray>
          <Grid sm={2} gap={20}>
            <InfoCard title="Full Name" value={updatedCustomer?.fullName || 'N/A'} $unStyled />
            <InfoCard title="Email" value={updatedCustomer?.email || 'N/A'} $unStyled />
            <InfoCard
              title="Subscription"
              value={
                updatedCustomer?.subscriptionDetail
                  ? updatedCustomer?.subscriptionDetail?.status.toLowerCase() === 'canceled'
                    ? `${updatedCustomer?.subscriptionDetail?.currentPlan} Cancelled`
                    : updatedCustomer?.subscriptionDetail?.currentPlan
                  : 'Free'
              }
              $unStyled
            />
            <InfoCard
              title="SignUp Date"
              value={format(new Date(updatedCustomer?.created_at), 'yyyy-MM-dd') || 'N/A'}
              $unStyled
            />
            <InfoCard
              title="Last Login Date"
              value={
                updatedCustomer?.lastLoginData ? format(new Date(updatedCustomer?.lastLoginData), 'yyyy-MM-dd') : 'N/A'
              }
              $unStyled
            />
            <InfoCard title="Credit Balance" value={updatedCustomer?.remainingCredits ?? 'N/A'} $unStyled />
          </Grid>
          <div className="wrap" style={{ paddingTop: '20px' }}>
            <Form form={form} onSubmit={onSubmit} onTouched={toggleAddEnDisEvent}>
              <div className="input-wrap">
                <Form.Item
                  type="number"
                  label="Credits"
                  name="addedCredits"
                  placeholder="Credits"
                  noMargin
                  rules={[{ required: false }]}>
                  <Field />
                </Form.Item>
                <Button disabled={isAddButtonDisbaled} loading={isLoading} type="primary" htmlType="submit">
                  Add
                </Button>
              </div>
            </Form>
          </div>
        </DetailsCard>
      )}
      {tab === 1 && <CreditHistory id={customer?.id} />}
    </CustomerInfo>
  );
}
export default CustomerDetailModal;
