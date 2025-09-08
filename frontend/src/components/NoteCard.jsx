import React from 'react';
import ImageCarousel from './ImageCarousel';

const NoteCard = ({ note, onViewComments, onLike, onDislike, userLikes }) => {
  return (
    <div className="group bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/30 transform hover:-translate-y-2">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {note.subject}
        </div>
        <div className="text-gray-500 text-sm">{note.date}</div>
      </div>

      {/* Image Carousel */}
      {note.images && <ImageCarousel images={note.images} title={note.title} />}
      
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-800 transition-colors">
        {note.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {note.content}
      </p>

      {/* Attachments and Links */}
      {(note.attachments?.length > 0 || note.links?.length > 0) && (
        <div className="mb-4 space-y-2">
          {note.attachments?.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📎</span>
              <span>{note.attachments.length} attachment(s)</span>
            </div>
          )}
          {note.links?.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔗</span>
              <span>{note.links.length} link(s)</span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="font-medium">By {note.author}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLike(note.id)}
            className={`flex items-center gap-1 transition-colors ${
              userLikes[note.id] === 'like' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <span>👍</span>
            <span className="font-medium">{note.likes}</span>
          </button>
          <button
            onClick={() => onDislike(note.id)}
            className={`flex items-center gap-1 transition-colors ${
              userLikes[note.id] === 'dislike' ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <span>👎</span>
            <span>{note.dislikes}</span>
          </button>
          <div className="flex items-center gap-1">
            <span className="text-blue-500">💬</span>
            <span className="text-gray-700">{note.comments}</span>
          </div>
        </div>
        
        <button
          onClick={() => onViewComments(note)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
        >
          View
        </button>
      </div>
      
      <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default NoteCard;