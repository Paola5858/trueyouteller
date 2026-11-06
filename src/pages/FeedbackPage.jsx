import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { buildMeta } from '../utils/seo';
import '../styles/FeedbackPage.css';

export const meta = () =>
  buildMeta({
    title: 'conte o que achou do TrueYouTeller',
    description: 'sua opinio ajuda a melhorar o teste de personalidade e os outros jogos do TrueYouTeller.',
    path: '/feedback',
  });

const FeedbackPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_FEEDBACK_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="feedback-container container section">
      <div className="feedback-content">
        <h1 className="page-title">o que voc achou?</h1>
        <p>
          queremos saber como foi sua experincia e o que poderia ficar melhor.
        </p>
        <form ref={form} className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">seu nome</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              {...register("name", {
                required: 'informe seu nome',
                minLength: {
                  value: 2,
                  message: 'o nome precisa ter pelo menos 2 caracteres',
                }
              })}
              placeholder="como podemos chamar você?"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">e-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              {...register("email", {
                required: 'informe seu e-mail',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'confira se o e-mail est correto',
                }
              })}
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="rating">como voc avalia a experincia?</label>
            <select 
              id="rating" 
              name="rating" 
              {...register("rating", {
                required: 'escolha uma nota',
              })}
              disabled={isSubmitting}
            >
              <option value="">selecione uma nota</option>
              <option value="5">⭐⭐⭐⭐⭐ excelente (5/5)</option>
              <option value="4">⭐⭐⭐⭐☆ muito boa (4/5)</option>
              <option value="3">⭐⭐⭐☆☆ boa (3/5)</option>
              <option value="2">⭐⭐☆☆☆ regular (2/5)</option>
              <option value="1">⭐☆☆☆☆ ruim (1/5)</option>
            </select>
            {errors.rating && (
              <p className="error-message">{errors.rating.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="feedback">sua opinio</label>
            <textarea 
              id="feedback" 
              name="feedback" 
              rows="6" 
              {...register("feedback", {
                required: 'escreva sua opinio',
                minLength: {
                  value: 10,
                  message: 'a opinio precisa ter pelo menos 10 caracteres',
                }
              })}
              placeholder="o que voc curtiu? o que podemos melhorar? vale qualquer sugesto..."
              disabled={isSubmitting}
            ></textarea>
            {errors.feedback && (
              <p className="error-message">{errors.feedback.message}</p>
            )}
          </div>
          
          {submitStatus === 'success' && (
            <div className="status-message success">
              obrigado por compartilhar sua opinio. ela ajuda o projeto a crescer.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="status-message error">
              não conseguimos enviar sua opinio agora. tente mais uma vez.
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'enviando...' : 'enviar opinio'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage; 