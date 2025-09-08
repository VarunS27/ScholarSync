// filepath: d:\ScholarSync\frontend\src\components\HomePage.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import NoteCard from './NoteCard';
import CommentModal from './CommentModal';
import notesData from '../data/Notes.json';

const HomePage = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [userLikes, setUserLikes] = useState({}); // Track user's likes/dislikes
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Load notes from JSON file
    setNotes(notesData.notes);
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => b.likes - a.likes);

  const handleViewComments = (note) => {
    setSelectedNote(note);
    setShowComments(true);
  };

  const handleLike = (noteId) => {
    const currentState = userLikes[noteId];
    const newState = currentState === 'like' ? null : 'like';
    
    setUserLikes({ ...userLikes, [noteId]: newState });
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        let newLikes = note.likes;
        let newDislikes = note.dislikes;
        
        if (currentState === 'like') {
          newLikes -= 1;
        } else if (currentState === 'dislike') {
          newDislikes -= 1;
          newLikes += 1;
        } else {
          newLikes += 1;
        }
        
        return { ...note, likes: newLikes, dislikes: newDislikes };
      }
      return note;
    }));
  };

  const handleDislike = (noteId) => {
    const currentState = userLikes[noteId];
    const newState = currentState === 'dislike' ? null : 'dislike';
    
    setUserLikes({ ...userLikes, [noteId]: newState });
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        let newLikes = note.likes;
        let newDislikes = note.dislikes;
        
        if (currentState === 'dislike') {
          newDislikes -= 1;
        } else if (currentState === 'like') {
          newLikes -= 1;
          newDislikes += 1;
        } else {
          newDislikes += 1;
        }
        
        return { ...note, likes: newLikes, dislikes: newDislikes };
      }
      return note;
    }));
  };

  const AddNoteModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      title: '',
      subject: '',
      content: '',
      links: [''],
      attachments: []
    });

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleLinkChange = (index, value) => {
      const newLinks = [...formData.links];
      newLinks[index] = value;
      setFormData({ ...formData, links: newLinks });
    };

    const addLink = () => {
      setFormData({ ...formData, links: [...formData.links, ''] });
    };

    const removeLink = (index) => {
      const newLinks = formData.links.filter((_, i) => i !== index);
      setFormData({ ...formData, links: newLinks });
    };

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData({ 
        ...formData, 
        attachments: [...formData.attachments, ...files] 
      });
    };

    const removeAttachment = (index) => {
      const newAttachments = formData.attachments.filter((_, i) => i !== index);
      setFormData({ ...formData, attachments: newAttachments });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newNote = {
        id: Date.now(),
        title: formData.title,
        subject: formData.subject,
        author: user?.name || 'Anonymous',
        content: formData.content,
        likes: 0,
        dislikes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0],
        images: [], // Add empty images array for consistency with existing notes
        attachments: formData.attachments.map(file => ({ 
          name: file.name, 
          type: file.type,
          size: file.size
        })),
        links: formData.links.filter(link => link.trim())
      };
      onSubmit(newNote);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Add New Note</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                  required
                >
                  <option value="">Select subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="History">History</option>
                  <option value="Literature">Literature</option>
                  <option value="Economics">Economics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder="Describe your notes..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Links <span className="text-gray-500">(optional)</span>
                </label>
                {formData.links.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                      placeholder="https://example.com"
                    />
                    {formData.links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLink}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  + Add another link
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attachments <span className="text-gray-500">(Images, PDFs, etc.)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                    className="w-full"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Drag and drop files or click to browse
                  </p>
                </div>
                
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">
                            {file.type?.includes('image') ? '🖼️' : 
                             file.type?.includes('pdf') ? '📄' : '📎'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-800">{file.name}</div>
                            <div className="text-sm text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const addNote = (newNote) => {
    setNotes([newNote, ...notes]);
    setShowAddNote(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">📚</span>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                ScholarSync
              </span>
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-blue-100 font-medium">
                Welcome, <span className="text-white">{user?.name || 'Student'}</span>!
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Logout
              </button>

                            <button
                onClick={() => setShowAddNote(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-xl">+</span>
                Add Note
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">
            Discover <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Notes</span>
          </h2>
          <p className="text-blue-100/80 mb-6 text-lg">Find the perfect study materials from our community</p>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{sortedNotes.length}</div>
              <div className="text-blue-200 text-sm">Available Notes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {sortedNotes.reduce((acc, note) => acc + note.likes, 0)}
              </div>
              <div className="text-blue-200 text-sm">Total Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {sortedNotes.reduce((acc, note) => acc + note.comments, 0)}
              </div>
              <div className="text-blue-200 text-sm">Comments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {[...new Set(sortedNotes.map(note => note.subject))].length}
              </div>
              <div className="text-blue-200 text-sm">Subjects</div>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onViewComments={handleViewComments}
              onLike={handleLike}
              onDislike={handleDislike}
              userLikes={userLikes}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedNotes.length === 0 && (
          <div className="text-center py-16 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
            <div className="text-8xl mb-6 opacity-50">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No notes found</h3>
            <p className="text-blue-100/80 text-lg">Try adjusting your search terms to discover more content</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-white to-blue-50 text-blue-800 rounded-xl font-medium hover:from-blue-50 hover:to-white transition-all duration-300 shadow-lg"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showAddNote && (
        <AddNoteModal
          onClose={() => setShowAddNote(false)}
          onSubmit={addNote}
        />
      )}

      {/* Comments Modal */}
      {showComments && (
        <CommentModal
          note={selectedNote}
          onClose={() => setShowComments(false)}
        />
      )}
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" className="w-full h-16 fill-white/5">
          <path d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;