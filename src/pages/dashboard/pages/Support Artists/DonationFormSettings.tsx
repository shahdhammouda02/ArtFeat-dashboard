import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Badge, Container } from "react-bootstrap";

const DonationFormSettings = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [allowCustomAmount, setAllowCustomAmount] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState({
    stripe: true,
    paypal: false,
    creditDebit: true,
  });

  const presetAmounts = [25, 50, 100, 250, 500];

  const handlePaymentOptionChange = (option: string) => {
    setPaymentOptions(prev => ({
      ...prev,
      [option]: !prev[option as keyof typeof prev]
    }));
  };

  const saveSettings = () => {
    console.log("Saving settings:", {
      donationType,
      selectedAmount,
      allowCustomAmount,
      paymentOptions
    });
  };

  const primaryColor = "#38bdf8";

  return (
    <>
      <style>
        {`
          .form-check-input:checked {
            background-color: ${primaryColor} !important;
            border-color: ${primaryColor} !important;
          }
          .form-check-input:focus {
            border-color: ${primaryColor} !important;
            box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.25) !important;
          }
          .form-switch .form-check-input:checked {
            background-color: ${primaryColor} !important;
            border-color: ${primaryColor} !important;
          }
          .badge.cursor-pointer {
            background-color: #f8f9fa !important;
            color: #6c757d !important;
            border: 1px solid #dee2e6 !important;
          }
          .badge.cursor-pointer.selected {
            background-color: ${primaryColor} !important;
            color: white !important;
            border: 1px solid ${primaryColor} !important;
          }
        `}
      </style>
      <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 p-4">
        <Row className="w-100 justify-content-center">
          <Col md={5} lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h5 className="mb-4 fw-bold">Form Settings</h5>

                {/* Donation Type */}
                <div className="mb-4">
                  <h6 className="mb-3 fw-semibold">Donation Type</h6>
                  <div className="d-flex gap-4">
                    <Form.Check
                      type="radio"
                      id="one-time"
                      name="donationType"
                      label="One-Time"
                      checked={donationType === "one-time"}
                      onChange={() => setDonationType("one-time")}
                      className="text-dark"
                    />
                    <Form.Check
                      type="radio"
                      id="monthly"
                      name="donationType"
                      label="Monthly"
                      checked={donationType === "monthly"}
                      onChange={() => setDonationType("monthly")}
                      className="text-dark"
                    />
                  </div>
                </div>

                {/* Preset Amounts */}
                <div className="mb-4">
                  <h6 className="mb-3 fw-semibold">Preset Amounts</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {presetAmounts.map((amount) => (
                      <Badge
                        key={amount}
                        className={`p-2 px-3 fs-6 fw-normal cursor-pointer ${selectedAmount === amount ? 'selected' : ''}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedAmount(amount)}
                      >
                        ${amount}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mb-4">
                  <h6 className="mb-3 fw-semibold">Custom Amount</h6>
                  <Form.Check
                    type="switch"
                    id="custom-amount-switch"
                    label="Allow Custom Amount"
                    checked={allowCustomAmount}
                    onChange={(e) => setAllowCustomAmount(e.target.checked)}
                    className="text-dark"
                  />
                </div>

                {/* Enabled Payment Options */}
                <div className="mb-4">
                  <h6 className="mb-3 fw-semibold">Enabled Payment Options</h6>
                  <div className="d-flex flex-column gap-2">
                    <Form.Check
                      type="checkbox"
                      id="stripe"
                      label="Stripe"
                      checked={paymentOptions.stripe}
                      onChange={() => handlePaymentOptionChange("stripe")}
                      className="text-dark"
                    />
                    <Form.Check
                      type="checkbox"
                      id="paypal"
                      label="PayPal"
                      checked={paymentOptions.paypal}
                      onChange={() => handlePaymentOptionChange("paypal")}
                      className="text-dark"
                    />
                    <Form.Check
                      type="checkbox"
                      id="creditDebit"
                      label="Credit/Debit Card"
                      checked={paymentOptions.creditDebit}
                      onChange={() => handlePaymentOptionChange("creditDebit")}
                      className="text-dark"
                    />
                  </div>
                  
                  <p className="text-muted small mt-3 mb-0">
                    Your donation data is securely processed and protected by 
                    industry-standard encryption.
                  </p>
                </div>

                {/* Save Button */}
                <Button
                  variant="primary"
                  className="w-100 py-2 fw-semibold"
                  style={{ 
                    backgroundColor: primaryColor, 
                    borderColor: primaryColor 
                  }}
                  onClick={saveSettings}
                >
                  Save Settings
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DonationFormSettings;