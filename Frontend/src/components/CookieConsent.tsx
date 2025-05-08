
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="px-6 py-4 bg-astra-green bg-opacity-10 backdrop-blur-md rounded-lg border border-astra-green border-opacity-30 flex items-center gap-4 max-w-2xl">
        <Cookie className="text-astra-light-green h-6 w-6" />
        <p className="text-sm text-astra-white">
          This website uses cookies to enhance your browsing experience, analyze traffic, and improve our services.
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setVisible(false)}
            className="border-astra-green text-astra-white hover:bg-astra-green hover:bg-opacity-20 hover:text-astra-light-green"
          >
            Decline
          </Button>
          <Button 
            size="sm"
            onClick={() => setVisible(false)}
            className="bg-astra-white text-astra-background hover:bg-astra-light-green"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
