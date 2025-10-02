import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Trash2, Plus, Upload, Link } from "lucide-react";
import image from "assets/images/CeramicWonders.jpeg";

interface Slide {
  id: number;
  heading: string;
  description: string;
  image: string;
  imageRecommendation: string;
}

const initialSlides: Slide[] = [
  {
    id: 1,
    heading: "Welcome to Our Support Center",
    description:
      "Find answers to your questions, troubleshoot issues, and get help from our expert team.",
    image: image as string,
    imageRecommendation: "Recommended size: 1920x1080 pixels",
  },
  {
    id: 2,
    heading: "Discover Our New Features",
    description:
      "Explore the latest additions and improvements designed to enhance your experience.",
    image: image as string,
    imageRecommendation: "Recommended size: 1920x1080 pixels",
  },
  {
    id: 3,
    heading: "Join Our Community",
    description:
      "Connect with other users, share tips, and provide feedback to our development team.",
    image: image as string,
    imageRecommendation: "Recommended size: 1920x1080 pixels",
  },
];

const HeroSection = () => {
  const [slides, setSlides] = useState(initialSlides);
  const [inputMode, setInputMode] = useState<Record<number, "url" | "file">>(
    {}
  );

  // Function to add a new slide
  const addNewSlide = () => {
    const newSlide: Slide = {
      id: Date.now(),
      heading: "New Slide Heading",
      description: "Brief description for the new hero slide content.",
      image: "https://via.placeholder.com/1920x1080?text=Placeholder+Image",
      imageRecommendation: "Recommended size: 1920x1080 pixels",
    };
    setSlides([...slides, newSlide]);
    setInputMode((prev) => ({ ...prev, [newSlide.id]: "url" }));
  };

  // Function to delete a slide by id
  const deleteSlide = (id: number) => {
    setSlides(slides.filter((slide) => slide.id !== id));
  };

  // Function to update a specific field of a slide
  const updateSlideField = (id: number, field: string, value: string) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    );
  };

  // Handler for local file selection
  const handleFileChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        updateSlideField(id, "image", reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      {/* Header with Title and Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0" style={{ fontSize: "28px" }}>
          Hero Section
        </h2>
        <Button
          onClick={addNewSlide}
          className="d-flex align-items-center gap-2"
          style={{
            backgroundColor: "#2196f3",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <Plus size={16} />
          Add Slide
        </Button>
      </div>

      {/* Slide Management Cards */}
      <div className="d-grid gap-4">
        {slides.map((slide) => {
          const currentMode =
            inputMode[slide.id] ||
            (slide.image.startsWith("http") || slide.image.startsWith("data:")
              ? "url"
              : "file");

          return (
            <Card
              key={slide.id}
              className="border shadow-sm"
              style={{ backgroundColor: "white", borderRadius: "8px" }}
            >
              <Card.Body className="p-4">
                {/* Card Header with Title and Remove Button */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold text-dark mb-0">Slide Content</h5>
                  <Button
                    variant="danger"
                    onClick={() => deleteSlide(slide.id)}
                    className="d-flex align-items-center gap-2"
                    style={{
                      borderRadius: "4px",
                      padding: "6px 12px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <Trash2 size={16} />
                    Remove Slide
                  </Button>
                </div>

                {/* Slide Content - Image and Text Fields */}
                <Row>
                  {/* Image Section - Left Col */}
                  <Col md={5} className="mb-3 mb-md-0">
                    <div className="d-flex flex-column h-100">
                      <Form.Group
                        controlId={`slideImage${slide.id}`}
                        className="flex-grow-1"
                      >
                        <Form.Label className="fw-semibold">
                          Slide Image
                        </Form.Label>
                        <img
                          src={slide.image}
                          alt="Slide preview"
                          className="w-100 mb-2"
                          loading="lazy"
                          style={{
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #e2e8f0",
                          }}
                          // Fallback for invalid URLs
                          onError={(e: any) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://via.placeholder.com/1920x1080?text=Image+Not+Found";
                          }}
                        />

                        {/* --- Toggle Buttons for Input Type --- */}
                        <div className="d-flex gap-2 mb-2">
                          <Button
                            variant={
                              currentMode === "url"
                                ? "primary"
                                : "outline-secondary"
                            }
                            size="sm"
                            onClick={() =>
                              setInputMode((prev) => ({
                                ...prev,
                                [slide.id]: "url",
                              }))
                            }
                            className="d-flex align-items-center gap-1"
                            // Applied specific style for the active state
                            style={
                              currentMode === "url"
                                ? {
                                    backgroundColor: "#2196f3",
                                    borderColor: "#2196f3",
                                  }
                                : {}
                            }
                          >
                            <Link size={14} /> URL
                          </Button>

                          <Button
                            variant={
                              currentMode === "file"
                                ? "primary"
                                : "outline-secondary"
                            }
                            size="sm"
                            onClick={() =>
                              setInputMode((prev) => ({
                                ...prev,
                                [slide.id]: "file",
                              }))
                            }
                            className="d-flex align-items-center gap-1"
                            // Applied specific style for the active state
                            style={
                              currentMode === "file"
                                ? {
                                    backgroundColor: "#2196f3",
                                    borderColor: "#2196f3",
                                  }
                                : {}
                            }
                          >
                            <Upload size={14} /> Upload File
                          </Button>
                        </div>

                        {/* --- Conditional Input Field --- */}
                        {currentMode === "url" ? (
                          <Form.Control
                            type="text"
                            placeholder="Paste Image URL here (e.g., https://example.com/image.jpg)"
                            value={
                              slide.image.startsWith("data:") ? "" : slide.image
                            }
                            onChange={(e) =>
                              updateSlideField(
                                slide.id,
                                "image",
                                e.target.value
                              )
                            }
                            className="mb-1"
                            style={{ fontSize: "12px" }}
                          />
                        ) : (
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleFileChange(slide.id, e)}
                            className="mb-1"
                            style={{ fontSize: "12px" }}
                          />
                        )}

                        <small
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          {slide.imageRecommendation}
                        </small>
                      </Form.Group>
                    </div>
                  </Col>

                  {/* Text Content Section - Right Col */}
                  <Col md={7}>
                    <Form.Group
                      controlId={`slideHeading${slide.id}`}
                      className="mb-3"
                    >
                      <Form.Label className="fw-semibold">Heading</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter heading"
                        value={slide.heading}
                        onChange={(e) =>
                          updateSlideField(slide.id, "heading", e.target.value)
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId={`slideDescription${slide.id}`}>
                      <Form.Label className="fw-semibold">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={slide.description}
                        onChange={(e) =>
                          updateSlideField(
                            slide.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="d-flex justify-content-end mt-5">
        <Button
          style={{
            backgroundColor: "#2196f3",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Save Hero Changes
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
