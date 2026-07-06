import { useState, useEffect } from "react";
import { api, resolveImageUrl, uploadImageToSupabase } from "../../utils/api";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/shared/ImageUpload";
import VideoUpload from "../../components/shared/VideoUpload";
import CrudManager from "../../components/admin/CrudManager";

/* ─── NEWS ─── */
export const AdminNews = () => (
  <AdminLayout>
    <CrudManager
      title="News & Notices"
      fetchAll={api.getAllNews}
      onCreate={api.createNews}
      onUpdate={api.updateNews}
      onDelete={api.deleteNews}
      emptyMsg="No news items yet. Add your first announcement!"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "badge_text", label: "Badge" },
        { key: "published", label: "Status" },
        {
          key: "created_at",
          label: "Date",
          render: (r) => new Date(r.created_at).toLocaleDateString(),
        },
      ]}
      fields={[
        {
          name: "title",
          label: "Title",
          required: true,
          placeholder: "e.g. Exam Schedule Released",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "General",
            "Academic",
            "Events",
            "Admissions",
            "Results",
            "Notice",
          ],
          default: "General",
        },
        {
          name: "badge_text",
          label: "Badge Text",
          placeholder: "e.g. New, Important",
          half: true,
        },
        {
          name: "badge_color",
          label: "Badge Color",
          type: "color",
          default: "#2D7D6F",
          half: true,
        },
        {
          name: "excerpt",
          label: "Short Excerpt",
          type: "textarea",
          rows: 2,
          placeholder: "Brief summary shown on homepage...",
        },
        {
          name: "content",
          label: "Full Content",
          type: "textarea",
          rows: 5,
          placeholder: "Full announcement text...",
        },
        {
          name: "image_url",
          label: "Featured Image",
          type: "image",
          placeholder: "Upload announcement image",
        },
        {
          name: "published",
          label: "Published",
          type: "toggle",
          default: true,
          onLabel: "Published",
          offLabel: "Draft",
        },
      ]}
    />
  </AdminLayout>
);

/* ─── EVENTS ─── */
export const AdminEvents = () => (
  <AdminLayout>
    <CrudManager
      title="Events"
      fetchAll={api.getAllEvents}
      onCreate={api.createEvent}
      onUpdate={api.updateEvent}
      onDelete={api.deleteEvent}
      emptyMsg="No events yet. Add your first upcoming event!"
      columns={[
        { key: "title", label: "Title" },
        {
          key: "event_date",
          label: "Date",
          render: (r) =>
            r.event_date ? new Date(r.event_date).toLocaleDateString() : "—",
        },
        { key: "category", label: "Category" },
        { key: "location", label: "Location" },
        {
          key: "is_featured",
          label: "Featured",
          render: (r) =>
            r.is_featured ? (
              <span className="crud-badge crud-badge--green">Featured</span>
            ) : (
              <span className="crud-badge crud-badge--gray">Regular</span>
            ),
        },
        { key: "published", label: "Status" },
      ]}
      fields={[
        {
          name: "title",
          label: "Event Title",
          required: true,
          placeholder: "e.g. Annual Science Fair",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "Academic",
            "Cultural",
            "Sports",
            "Workshop",
            "Seminar",
            "Social",
            "Career",
          ],
          default: "Academic",
        },
        {
          name: "event_date",
          label: "Event Date",
          type: "date",
          required: true,
          half: true,
        },
        {
          name: "event_time",
          label: "Event Time",
          placeholder: "e.g. 10:00 AM",
          half: true,
        },
        {
          name: "location",
          label: "Location",
          placeholder: "e.g. Main Auditorium",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 4,
          placeholder: "What will happen at this event...",
        },
        {
          name: "image_url",
          label: "Event Image",
          type: "image",
          placeholder: "Upload event image",
        },
        {
          name: "is_featured",
          label: "Feature on Homepage",
          type: "toggle",
          default: false,
          onLabel: "Featured",
          offLabel: "Regular",
        },
        {
          name: "published",
          label: "Published",
          type: "toggle",
          default: true,
          onLabel: "Published",
          offLabel: "Draft",
        },
      ]}
    />
  </AdminLayout>
);

/* ─── PROGRAMS ─── */
export const AdminPrograms = () => (
  <AdminLayout>
    <CrudManager
      title="Programmes"
      fetchAll={api.getAllPrograms}
      onCreate={api.createProgram}
      onUpdate={api.updateProgram}
      onDelete={api.deleteProgram}
      emptyMsg="No programmes yet. Add your first programme!"
      columns={[
        { key: "title", label: "Programme" },
        { key: "duration", label: "Duration" },
        { key: "normal_fee", label: "Normal Fee" },
        { key: "seats", label: "Seats" },
        { key: "sort_order", label: "Order" },
        { key: "published", label: "Status" },
      ]}
      fields={[
        // Basic Info
        {
          name: "title",
          label: "Programme Title",
          required: true,
          placeholder: "e.g. Business & Management",
        },
        {
          name: "duration",
          label: "Duration",
          placeholder: "e.g. 3 Years",
          half: true,
        },
        {
          name: "sort_order",
          label: "Display Order",
          type: "number",
          default: 0,
          half: true,
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 3,
          placeholder: "What this programme covers...",
        },

        // Fees Section
        {
          name: "normal_fee",
          label: "Normal Course Fee",
          placeholder: "e.g. ₹50,000 per year",
          half: true,
        },
        {
          name: "addon_fee",
          label: "Add-on Course Fee",
          placeholder: "e.g. ₹15,000",
          half: true,
        },

        // Additional Details
        {
          name: "addon_courses",
          label: "Add-on Courses (one per line)",
          type: "textarea",
          rows: 3,
          placeholder:
            "Industry Certification\nLeadership Training\nLanguage Programme",
        },
        {
          name: "seats",
          label: "Number of Seats",
          type: "number",
          placeholder: "e.g. 60",
          half: true,
        },
        {
          name: "tags",
          label: "Program Type (e.g. Job-Ready Program)",
          type: "textarea",
          rows: 2,
          placeholder: "Job-Ready Program",
        },
        {
          name: "features",
          label: "Career Paths After Graduation (one per line)",
          type: "textarea",
          rows: 4,
          placeholder:
            "Bank & NBFC roles\nInsurance sector positions\nFintech entry-level positions",
        },

        // Status
        {
          name: "published",
          label: "Published",
          type: "toggle",
          default: true,
          onLabel: "Published",
          offLabel: "Draft",
        },
      ]}
    />
  </AdminLayout>
);

/* ─── GALLERY ─── */
export const AdminGallery = () => (
  <AdminLayout>
    <CrudManager
      title="Gallery"
      fetchAll={api.getAllGallery}
      onCreate={api.createGallery}
      onUpdate={api.updateGallery}
      onDelete={api.deleteGallery}
      emptyMsg="No gallery images yet. Add your first campus photo!"
      columns={[
        {
          key: "image_url",
          label: "Preview",
          render: (r) => {
            const raw = r.image_url || null;
            const src = resolveImageUrl(raw);
            if (!src) return "—";
            if (r.media_type === "video") {
              return (
                <video
                  src={src}
                  style={{
                    width: 60,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                  muted
                />
              );
            }
            return (
              <img
                src={src}
                alt=""
                style={{
                  width: 60,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            );
          },
        },
        {
          key: "media_type",
          label: "Type",
          render: (r) => (
            <span
              className={`crud-badge ${r.media_type === "video" ? "crud-badge--green" : "crud-badge--gray"}`}
            >
              {r.media_type === "video" ? "Video" : "Image"}
            </span>
          ),
        },
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "sort_order", label: "Order" },
        { key: "published", label: "Status" },
      ]}
      fields={[
        {
          name: "image_url",
          label: "Upload Image or Video",
          type: "media",
          mediaTypeField: "media_type",
          placeholder: "Drag & drop or click to upload",
        },
        { name: "media_type", type: "hidden", default: "image" },
        {
          name: "title",
          label: "Caption / Title",
          placeholder: "e.g. Students at Science Lab",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "Campus Life",
            "Events",
            "Facilities",
            "Sports",
            "Cultural",
            "Graduation",
          ],
          default: "Campus Life",
        },
        {
          name: "sort_order",
          label: "Display Order",
          type: "number",
          default: 0,
          half: true,
        },
        {
          name: "published",
          label: "Published",
          type: "toggle",
          default: true,
          onLabel: "Published",
          offLabel: "Hidden",
        },
      ]}
    />
  </AdminLayout>
);

/* ─── TESTIMONIALS ─── */

export const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeModal, setTypeModal] = useState(false);
  const [modal, setModal] = useState(null); // 'create-text' | 'create-video' | 'edit-text' | 'edit-video'
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [formImageData, setFormImageData] = useState({});
  const [formVideoData, setFormVideoData] = useState({});
  const [formThumbData, setFormThumbData] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");

  const { useState: _u } = require("react"); // already imported at top

  const load = () => {
    setLoading(true);
    api
      .getAllTestimonials()
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const flash = (text, type = "success") => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(""), 3000);
  };

  const handleChange = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const openEdit = (item) => {
    setForm({
      name: item.name || "",
      role: item.role || "",
      content: item.content || "",
      rating: String(item.rating || 5),
      avatar_url: item.avatar_url || "",
      video_url: item.video_url || "",
      thumbnail_url: item.thumbnail_url || "",
      published: item.published !== false,
    });
    setFormImageData({});
    setFormVideoData({});
    setFormThumbData({});
    setEditItem(item);
    setModal(item.video_url ? "edit-video" : "edit-text");
  };

  const closeModal = () => {
    setModal(null);
    setEditItem(null);
    setForm({});
    setFormImageData({});
    setFormVideoData({});
    setFormThumbData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form };

    // Upload avatar image if selected
    if (formImageData.avatar_url) {
      try {
        const dataUrl = formImageData.avatar_url;
        const fetchRes = await fetch(dataUrl);
        const blob = await fetchRes.blob();
        const ext = blob.type.split("/")[1] || "jpg";
        const file = new File([blob], `avatar_${Date.now()}.${ext}`, {
          type: blob.type,
        });
        payload.avatar_url = await uploadImageToSupabase(file);
      } catch (err) {
        flash("Avatar upload failed: " + err.message, "error");
        setSaving(false);
        return;
      }
    }

    // Upload thumbnail if selected
    if (formThumbData.thumbnail_url) {
      try {
        const dataUrl = formThumbData.thumbnail_url;
        const fetchRes = await fetch(dataUrl);
        const blob = await fetchRes.blob();
        const ext = blob.type.split("/")[1] || "jpg";
        const file = new File([blob], `thumb_${Date.now()}.${ext}`, {
          type: blob.type,
        });
        payload.thumbnail_url = await uploadImageToSupabase(file);
      } catch (err) {
        flash("Thumbnail upload failed: " + err.message, "error");
        setSaving(false);
        return;
      }
    }

    // Video URL already set via handleChange from VideoUpload component
    if (formVideoData.video_url?.url)
      payload.video_url = formVideoData.video_url.url;

    // Clear irrelevant fields based on type
    if (modal === "create-video" || modal === "edit-video") {
      payload.content = payload.content || "";
      payload.avatar_url = payload.avatar_url || null;
    } else {
      payload.video_url = null;
      payload.thumbnail_url = null;
    }

    payload.published =
      payload.published === true || payload.published === "true";
    if (
      typeof payload.avatar_url === "string" &&
      payload.avatar_url.startsWith("local_")
    )
      delete payload.avatar_url;
    if (
      typeof payload.thumbnail_url === "string" &&
      payload.thumbnail_url.startsWith("local_")
    )
      delete payload.thumbnail_url;

    try {
      if (modal === "create-text" || modal === "create-video") {
        const res = await api.createTestimonial(payload);
        if (res.error) throw new Error(res.error);
        flash("Created successfully!", "success");
      } else {
        const res = await api.updateTestimonial(editItem.id, payload);
        if (res.error) throw new Error(res.error);
        flash("Updated successfully!", "success");
      }
      closeModal();
      load();
    } catch (err) {
      flash(err.message || "Something went wrong", "error");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await api.deleteTestimonial(id);
    setDeleteId(null);
    load();
    flash("Deleted.", "success");
  };

  const isVideo = modal === "create-video" || modal === "edit-video";
  const isCreate = modal === "create-text" || modal === "create-video";

  return (
    <AdminLayout>
      <div className="crud-manager">
        <div className="crud-manager__header">
          <div>
            <h2 className="crud-manager__title">Testimonials</h2>
            <p className="crud-manager__count">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setTypeModal(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New
          </button>
        </div>

        {msg && (
          <div
            className={`crud-manager__flash ${msgType === "error" ? "crud-manager__flash--error" : ""}`}
          >
            {msg}
          </div>
        )}

        {loading ? (
          <div className="loader">
            <div className="spinner"></div> Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="crud-manager__empty">
            <p>No testimonials yet.</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setTypeModal(true)}
            >
              Add First Item
            </button>
          </div>
        ) : (
          <div className="crud-manager__table-wrap">
            <table className="crud-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Rating</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{"★".repeat(item.rating || 5)}</td>
                    <td>
                      <span
                        className={`crud-badge ${item.video_url ? "crud-badge--green" : "crud-badge--gray"}`}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          {item.video_url ? (
                            <>
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect
                                  x="1"
                                  y="5"
                                  width="15"
                                  height="14"
                                  rx="2"
                                />
                              </svg>
                              Video
                            </>
                          ) : (
                            <>
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                              Text
                            </>
                          )}
                        </span>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`crud-badge ${item.published ? "crud-badge--green" : "crud-badge--gray"}`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <div className="crud-table__actions">
                        <button
                          className="crud-btn crud-btn--edit"
                          onClick={() => openEdit(item)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="crud-btn crud-btn--delete"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Type Picker Modal ── */}
        {typeModal && (
          <div
            className="crud-modal-overlay"
            onClick={() => setTypeModal(false)}
          >
            <div
              className="crud-modal crud-modal--sm"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 420 }}
            >
              <div className="crud-modal__header">
                <h3 className="crud-modal__title">Add New Testimonial</h3>
                <button
                  className="crud-modal__close"
                  onClick={() => setTypeModal(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div style={{ padding: "24px", display: "flex", gap: 16 }}>
                <button
                  className="testimonial-type-btn"
                  onClick={() => {
                    setForm({ rating: "5", published: true });
                    setTypeModal(false);
                    setModal("create-text");
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--primary, #2D7D6F)" }}
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <strong>Text Testimonial</strong>
                  <span>Written review with avatar photo</span>
                </button>
                <button
                  className="testimonial-type-btn"
                  onClick={() => {
                    setForm({ rating: "5", published: true });
                    setTypeModal(false);
                    setModal("create-video");
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--primary, #2D7D6F)" }}
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <strong>Video Testimonial</strong>
                  <span>Upload a video with thumbnail</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Text Testimonial Modal ── */}
        {(modal === "create-text" || modal === "edit-text") && (
          <div className="crud-modal-overlay" onClick={closeModal}>
            <div className="crud-modal" onClick={(e) => e.stopPropagation()}>
              <div className="crud-modal__header">
                <h3 className="crud-modal__title">
                  {isCreate ? "Add" : "Edit"} Text Testimonial
                </h3>
                <button className="crud-modal__close" onClick={closeModal}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="crud-modal__form">
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-input"
                      required
                      placeholder="Jane Smith"
                      value={form.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Role / Programme</label>
                    <input
                      className="form-input"
                      placeholder="BSc Business, Batch 2024"
                      value={form.role || ""}
                      onChange={(e) => handleChange("role", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Testimonial *</label>
                  <textarea
                    className="form-textarea"
                    required
                    rows={4}
                    placeholder="What the student said..."
                    value={form.content || ""}
                    onChange={(e) => handleChange("content", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Rating (1–5)</label>
                  <select
                    className="form-select"
                    value={form.rating || "5"}
                    onChange={(e) => handleChange("rating", e.target.value)}
                  >
                    {["5", "4", "3", "2", "1"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Avatar Photo</label>
                  <ImageUpload
                    onImageSelect={(file, dataUrl) => {
                      setFormImageData((prev) => ({
                        ...prev,
                        avatar_url: dataUrl,
                      }));
                      if (dataUrl)
                        handleChange("avatar_url", `local_${Date.now()}`);
                    }}
                    initialImage={(() => {
                      const v = form.avatar_url;
                      if (!v || v.startsWith("local_")) return null;
                      return resolveImageUrl(v);
                    })()}
                    disabled={saving}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Published</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 6,
                    }}
                  >
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={!!form.published}
                        onChange={(e) =>
                          handleChange("published", e.target.checked)
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>
                      {form.published ? "Published" : "Hidden"}
                    </span>
                  </div>
                </div>
                <div className="crud-modal__footer">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ animation: "spin 1s linear infinite" }}
                        >
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                        Saving...
                      </>
                    ) : isCreate ? (
                      <>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Create
                      </>
                    ) : (
                      <>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Video Testimonial Modal ── */}
        {(modal === "create-video" || modal === "edit-video") && (
          <div className="crud-modal-overlay" onClick={closeModal}>
            <div className="crud-modal" onClick={(e) => e.stopPropagation()}>
              <div className="crud-modal__header">
                <h3 className="crud-modal__title">
                  {isCreate ? "Add" : "Edit"} Video Testimonial
                </h3>
                <button className="crud-modal__close" onClick={closeModal}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="crud-modal__form">
                <div style={{ display: "flex", gap: 16 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-input"
                      required
                      placeholder="Jane Smith"
                      value={form.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Role / Programme</label>
                    <input
                      className="form-input"
                      placeholder="BSc Business, Batch 2024"
                      value={form.role || ""}
                      onChange={(e) => handleChange("role", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Short Description{" "}
                    <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                      (shown above video)
                    </span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="e.g. Watch what Jane has to say about campus life..."
                    value={form.content || ""}
                    onChange={(e) => handleChange("content", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Video Upload *</label>
                  <VideoUpload
                    onUploadComplete={(result) => {
                      setFormVideoData((prev) => ({
                        ...prev,
                        video_url: result,
                      }));
                      if (result.url) handleChange("video_url", result.url);
                    }}
                    initialFile={
                      form.video_url ? { url: form.video_url, name: "" } : null
                    }
                    disabled={saving}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Thumbnail Image{" "}
                    <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                      (poster shown before play)
                    </span>
                  </label>
                  <ImageUpload
                    onImageSelect={(file, dataUrl) => {
                      setFormThumbData((prev) => ({
                        ...prev,
                        thumbnail_url: dataUrl,
                      }));
                      if (dataUrl)
                        handleChange("thumbnail_url", `local_${Date.now()}`);
                    }}
                    initialImage={(() => {
                      const v = form.thumbnail_url;
                      if (!v || v.startsWith("local_")) return null;
                      return resolveImageUrl(v);
                    })()}
                    disabled={saving}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Rating (1–5)</label>
                  <select
                    className="form-select"
                    value={form.rating || "5"}
                    onChange={(e) => handleChange("rating", e.target.value)}
                  >
                    {["5", "4", "3", "2", "1"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Published</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 6,
                    }}
                  >
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={!!form.published}
                        onChange={(e) =>
                          handleChange("published", e.target.checked)
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>
                      {form.published ? "Published" : "Hidden"}
                    </span>
                  </div>
                </div>
                <div className="crud-modal__footer">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : isCreate
                        ? "+ Create"
                        : "💾 Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Delete Confirm ── */}
        {deleteId && (
          <div className="crud-modal-overlay">
            <div className="crud-modal crud-modal--sm">
              <div className="crud-modal__header">
                <h3 className="crud-modal__title">Confirm Delete</h3>
                <button
                  className="crud-modal__close"
                  onClick={() => setDeleteId(null)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <p
                  style={{
                    color: "var(--mid)",
                    fontSize: 15,
                    marginBottom: 24,
                  }}
                >
                  Are you sure? This cannot be undone.
                </p>
                <div className="crud-modal__footer">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setDeleteId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(deleteId)}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

/* ─── RESOURCES ─── */
export const AdminResources = () => (
  <AdminLayout>
    <CrudManager
      title="Resources & Downloads"
      fetchAll={api.getAllResources}
      onCreate={api.createResource}
      onUpdate={api.updateResource}
      onDelete={api.deleteResource}
      emptyMsg="No resources yet. Upload your first study material or question paper!"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "subject", label: "Subject" },
        { key: "year", label: "Year" },
        {
          key: "file_name",
          label: "File",
          render: (r) => r.file_name || (r.file_url ? "✓ Uploaded" : "—"),
        },
        { key: "published", label: "Status" },
      ]}
      fields={[
        {
          name: "title",
          label: "Resource Title *",
          required: true,
          placeholder: "e.g. B.Com 3rd Sem Question Paper 2023",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "Question Papers",
            "Study Materials",
            "Syllabus",
            "Lecture Notes",
            "Timetable",
            "Circulars",
            "Forms",
            "General",
          ],
          default: "Question Papers",
        },
        {
          name: "subject",
          label: "Subject",
          placeholder: "e.g. B.Com – Co-operation",
          half: true,
        },
        {
          name: "year",
          label: "Year / Semester",
          placeholder: "e.g. 2023 / Sem 3",
          half: true,
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 2,
          placeholder: "Optional — short note about this file...",
        },
        {
          name: "file_url",
          label: "Upload File (PDF, DOC, XLSX…)",
          type: "file",
          placeholder: "Click or drag to upload resource file",
          required: true,
        },
        {
          name: "sort_order",
          label: "Display Order",
          type: "number",
          default: 0,
          half: true,
        },
        {
          name: "published",
          label: "Published",
          type: "toggle",
          default: true,
          onLabel: "Published",
          offLabel: "Draft",
        },
      ]}
    />
  </AdminLayout>
);
