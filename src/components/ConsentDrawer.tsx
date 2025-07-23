import React, { useState, useRef } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { ConsentModal, type ConsentModalRef } from "./ConsentModal";
import { useTranslation } from "react-i18next";

interface ConsentDrawerProps {
  isLoading: boolean;
  onSubmit: (userData: { name: string; gender: string; ageRange: string; consent: boolean }) => void;
}

export const ConsentDrawer: React.FC<ConsentDrawerProps> = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const consentModalRef = useRef<ConsentModalRef>(null);

  const handleButtonClick = () => {
    if (consentModalRef.current) {
      consentModalRef.current.submit();
    }
  };

  const handleSubmit = (userData: { name: string; gender: string; ageRange: string; consent: boolean }) => {
    onSubmit(userData);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button disabled={isLoading} className="w-full text-xs cursor-pointer">
          {isLoading ? t("consent.drawer.preparing") : t("consent.drawer.startButton")}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-xl mx-auto">
        <div className="px-6">
          <DrawerHeader>
            <DrawerTitle className="text-sm">{t("consent.drawer.title")}</DrawerTitle>
            <DrawerDescription className="text-sm">{t("consent.drawer.description")}</DrawerDescription>
          </DrawerHeader>
          <ConsentModal ref={consentModalRef} onSubmit={handleSubmit} />
          <DrawerFooter>
            <Button onClick={handleButtonClick} className="text-xs">
              {t("consent.drawer.agree")}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="text-xs">
                {t("consent.drawer.cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
