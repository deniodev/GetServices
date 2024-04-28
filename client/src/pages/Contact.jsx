import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from "react-hot-toast";


const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_up3dqi5', 'template_0lz9f1d', form.current, 'r10s-hMpE6DwP6_gw')
      .then((result) => {
          console.log(result.text);
          toast.success("Message sent!");
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <section>
      <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center p-2"> Contact Us</h1>
        <p className='text-s leading-loose text-center'>
        Have a technical problem? Want to provide feedback on a better feature? Inform us.
        </p>
        <form ref={form} onSubmit={sendEmail} className='space-y-8 ml-5 mr-5'>
        <div>
            <Label htmlFor="name"className='ml-1'>
            Name
            </Label>
            <Input type="name"
            name='user_name'
            id='name'
            placeholder="Full Name"
            className="" 
            required
            />
          </div>
          <div>
            <Label htmlFor="email"className='ml-1'>
              Email
            </Label>
            <Input type="email"
            name='user_email'
            id='email'
            placeholder='example@gmail.com'
            className=""
            required
             />
          </div>
          <div>
            <Label htmlFor="subject"
            className='form__label'>
              Subject
            </Label>
            <Input type="text"
            name='user_subject'
            id='subject'
            placeholder="Please let us know how we can help you"
            required />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message"
            className='form__label'>
              Your message
            </Label>
            <Textarea
            name='message'
            rows='6'
            type="text"
            id='message'
            required
            placeholder="Leave your comment"
            className="form__input mt-1" />
          </div>
          <Button 
          type="submit"
          className="btn rounded sm:w-fit">
            Send
          </Button>
        </form>

      </div>
    </section>
  )
}

export default Contact