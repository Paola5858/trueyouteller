import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { buildMeta } from '../utils/seo';
import '../styles/ContactUsPage.css';

export const meta = () =>
  buildMeta({
    title: 'fale com o TrueYouTeller',
    description: 'tem uma dvida, sugesto ou s quer conversar? mande uma mensagem para a equipe do TrueYouTeller.',
    path: '/contact',
  });

const ContactUsPage = () => {
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
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-us-container container section">
      <div className="contact-us-content">
        <h1 className="page-title">fale com a gente</h1>
        <p>
          tem uma dvida, uma ideia ou quer dar um oi? escreva para ns por aqui.
        </p>
        <form ref={form} className="contact-form" onSubmit={handleSubmit(onSubmit)}>
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
            <label htmlFor="message">mensagem</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              {...register("message", {
                required: 'escreva uma mensagem',
                minLength: {
                  value: 10,
                  message: 'a mensagem precisa ter pelo menos 10 caracteres',
                }
              })}
              placeholder="conte um pouco do que voc precisa..."
              disabled={isSubmitting}
            ></textarea>
            {errors.message && (
              <p className="error-message">{errors.message.message}</p>
            )}
          </div>
          
          {submitStatus === 'success' && (
            <div className="status-message success">
              valeu por escrever! vamos responder assim que pudermos.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="status-message error">
              não conseguimos enviar sua mensagem agora. tente mais uma vez.
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'enviando...' : 'enviar mensagem'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage; 