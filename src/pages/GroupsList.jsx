import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./groupsList.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function GroupsList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await axios.get(`${API_URL}/public-show/groups`);
        if (response.data?.data?.groups) {
          setGroups(response.data.data.groups);
        }
      } catch (err) {
        console.error("Failed to load groups:", err);
        setError("Failed to load groups. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  const handleGroupClick = (groupId, group) => {
    navigate(`/groups/${groupId}`, { state: { group } });
  };

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "430px",
          margin: "0 auto",
          padding: "40px 20px",
          textAlign: "center",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <p>Loading groups...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        padding: "20px 20px 28px 20px",
        color: "#000000",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{ marginBottom: "24px", display: "flex", alignItems: "center" }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            padding: "8px",
            marginRight: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          ←
        </button>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "800",
            margin: 0,
            color: "#000000",
          }}
        >
          Groups
        </h1>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#fee",
            color: "#c00",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* Groups List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {groups.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            No groups available
          </p>
        ) : (
          groups.map((group) => (
            <button
              key={group._id}
              onClick={() => handleGroupClick(group._id, group)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f3f4f6",
                border: "1.5px solid #d1d5db",
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                hover: {
                  backgroundColor: "#e5e7eb",
                  borderColor: "#9ca3af",
                },
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e5e7eb";
                e.currentTarget.style.borderColor = "#9ca3af";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
            >
              <div style={{ flex: 1, marginRight: "12px" }}>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    margin: "0 0 4px 0",
                    color: "#000000",
                  }}
                >
                  {group.title}
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  {group.description || "No description"}
                </p>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#9ca3af",
                }}
              >
                →
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
