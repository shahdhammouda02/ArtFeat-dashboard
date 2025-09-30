import {
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { Trash2, Plus, Sparkles } from "lucide-react";

const SuccessStories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      artistName: "",
      title: "Success Story Title",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Our client, a fintech startup, achieved a 200% increase in user acquisition within six months using our platform.",
      quote: "",
      minCharacters: 200
    },
    {
      id: 2,
      artistName: "",
      title: "Success Story Title 2",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Our client, a fintech startup, achieved a 200% increase in user acquisition within six months using our platform.",
      quote: "",
      minCharacters: 200
    },
    {
      id: 3,
      artistName: "",
      title: "Success Story Title 3",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Our client, a fintech startup, achieved a 200% increase in user acquisition within six months using our platform.",
      quote: "",
      minCharacters: 200
    }
  ]);

  const addNewStory = () => {
    const newStory = {
      id: stories.length + 1,
      artistName: "",
      title: `Success Story Title ${stories.length + 1}`,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Our client, a fintech startup, achieved a 200% increase in user acquisition within six months using our platform.",
      quote: "",
      minCharacters: 200
    };
    setStories([...stories, newStory]);
  };

  const deleteStory = (id: number) => {
    setStories(stories.filter(story => story.id !== id));
  };

  const updateStoryField = (id: number, field: string, value: string) => {
    setStories(stories.map(story => 
      story.id === id ? { ...story, [field]: value } : story
    ));
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "24px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0" style={{ fontSize: "28px" }}>Success Stories Management</h2>
        <Button
          onClick={addNewStory}
          className="d-flex align-items-center gap-2"
          style={{
            backgroundColor: "#38bdf8",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          <Plus size={16} />
          New Story
        </Button>
      </div>

      {/* Stories Grid */}
      <Row className="g-4">
        {stories.map((story) => (
          <Col lg={4} md={6} key={story.id}>
            <div>
              {/* Artist Name Input - Separate Card */}
              <div style={{ backgroundColor: "#f1f5f9", borderRadius: "8px", padding: "8px 12px", marginBottom: "16px" }}>
                <Form.Control
                  type="text"
                  placeholder="Type a Artist Name"
                  value={story.artistName}
                  onChange={(e) => updateStoryField(story.id, 'artistName', e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "14px",
                    padding: "0",
                    color: "#9ca3af",
                    boxShadow: "none",
                    height: "20px"
                  }}
                />
              </div>

              {/* Main Story Card */}
              <Card className="border-0 shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px", marginBottom: "16px" }}>
                <Card.Body className="p-4">
                  {/* Story Title with Delete */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold text-dark mb-0" style={{ fontSize: "16px" }}>{story.title}</h6>
                    <button
                      onClick={() => deleteStory(story.id)}
                      className="btn btn-sm p-1"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#ef4444"
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Story Image */}
                  <div className="mb-3">
                    <img
                      src={story.image}
                      alt="Success Story"
                      className="w-100"
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        backgroundColor: "#f1f5f9"
                      }}
                    />
                  </div>

                  {/* Description with AI Suggest inside */}
                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "12px", marginBottom: "8px" }}>
                    {/* AI Suggest Button - Left Aligned inside description area */}
                    <div className="mb-2 text-start">
                      <Button
                        variant="link"
                        className="p-0 d-flex align-items-center gap-2 text-decoration-none"
                        style={{ color: "#38bdf8", fontSize: "14px", fontWeight: "500", justifyContent: "flex-start" }}
                      >
                        <Sparkles size={14} />
                        Suggest with AI
                      </Button>
                    </div>

                    {/* Description */}
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={story.description}
                      onChange={(e) => updateStoryField(story.id, 'description', e.target.value)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        fontSize: "14px",
                        resize: "none",
                        padding: "0",
                        lineHeight: "1.5",
                        boxShadow: "none"
                      }}
                    />
                  </div>
                  <small className="text-muted" style={{ fontSize: "12px" }}>Min Characters {story.minCharacters}</small>
                </Card.Body>
              </Card>

              {/* Quote Input - Separate Card */}
              <div style={{ backgroundColor: "#f1f5f9", borderRadius: "8px", padding: "8px 12px" }}>
                <Form.Control
                  type="text"
                  placeholder="Type a Quote"
                  value={story.quote}
                  onChange={(e) => updateStoryField(story.id, 'quote', e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "14px",
                    padding: "0",
                    color: "#9ca3af",
                    boxShadow: "none",
                    height: "20px"
                  }}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3 mt-5">
        <Button
          variant="outline-secondary"
          style={{
            borderColor: "#d1d5db",
            color: "#6b7280",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "white"
          }}
        >
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "#38bdf8",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SuccessStories;