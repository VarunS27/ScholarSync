import React, { useState } from 'react';

const CommentModal = ({ note, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "These notes are incredibly helpful! Thanks for sharing.",
      date: "2025-09-07",
      likes: 5,
      avatar: "👤"
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Could you add more examples in the second section?",
      date: "2025-09-06",
      likes: 2,
      avatar: "👩"
    },
    {
      id: 3,
      author: "Bob Wilson",
      content: "Perfect explanation of complex concepts!",
      date: "2025-09-05",
      likes: 8,
      avatar: "👨"
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCommentObj = {
        id: Date.now(),
        author: "You",
        content: newComment.trim(),
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        avatar: "😊"
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }
  };

  const handleCommentLike = (commentId) => {
    const isLiked = commentLikes[commentId];
    setCommentLikes({ ...commentLikes, [commentId]: !isLiked });
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl border border-white/20 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-indigo-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {note.subject}
                  </div>
                  <div className="text-sm text-gray-500">{note.date}</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">{note.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">by {note.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      👍 {note.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      💬 {comments.length}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-xl transition-all duration-300 ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 border-b border-white/20">
            <div className="bg-white/60 rounded-2xl p-6 border border-white/40">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Note Content</h3>
              <p className="text-gray-700 leading-relaxed">{note.content}</p>
              
              {/* Attachments and Links */}
              {(note.attachments?.length > 0 || note.links?.length > 0) && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  {note.attachments?.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {note.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                            <span>
                              {attachment.type?.includes('image') ? '🖼️' : 
                               attachment.type?.includes('pdf') ? '📄' : '📎'}
                            </span>
                            <span className="text-blue-700">{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {note.links?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Links</h4>
                      <div className="space-y-1">
                        {note.links.map((link, index) => (
                          <a key={index} href={link} target="_blank" rel="noopener noreferrer" 
                             className="block text-blue-600 hover:text-blue-800 text-sm break-all">
                            🔗 {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto max-h-80">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Discussion ({comments.length})
                </h3>
                <div className="text-sm text-gray-500">
                  Most recent first
                </div>
              </div>
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/40 hover:border-white/60 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-semibold text-gray-800">{comment.author}</span>
                            {comment.author === "You" && (
                              <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                        <button 
                          onClick={() => handleCommentLike(comment.id)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            commentLikes[comment.id] 
                              ? 'text-red-500' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <span className={commentLikes[comment.id] ? '❤️' : '🤍'}>
                            {commentLikes[comment.id] ? '❤️' : '🤍'}
                          </span>
                          <span className="font-medium">{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">💬</div>
                    <p className="text-gray-500 text-lg">No comments yet</p>
                    <p className="text-gray-400">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Comment Form */}
          <div className="p-6 border-t border-white/20 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Add your comment</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  😊
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    placeholder="Share your thoughts about this note..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 resize-none placeholder-gray-400"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {newComment.length}/500 characters
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!newComment.trim() || isSubmitting}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Posting...
                        </>
                      ) : (
                        <>
                          Post Comment
                          <span>🚀</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;