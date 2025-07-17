import React, { useState, useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { ConsentModal, type ConsentModalRef } from "./ConsentModal";

interface ConsentDrawerProps {
  isLoading: boolean;
  onSubmit: (userData: {
    name: string;
    gender: string;
    ageRange: string;
    consent: boolean;
  }) => void;
}

export const ConsentDrawer: React.FC<ConsentDrawerProps> = ({
  isLoading,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const consentModalRef = useRef<ConsentModalRef>(null);

  const handleButtonClick = () => {
    if (consentModalRef.current) {
      consentModalRef.current.submit();
    }
  };

  const handleSubmit = (userData: {
    name: string;
    gender: string;
    ageRange: string;
    consent: boolean;
  }) => {
    onSubmit(userData);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button disabled={isLoading} className="w-full text-xs">
          {isLoading ? "준비 중..." : "테스트 시작하기"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>개인정보 수집 및 이용 동의</DrawerTitle>
            <DrawerDescription>
              개인정보 수집 및 이용 동의 내용을 확인해주세요.
            </DrawerDescription>
          </DrawerHeader>
          <ConsentModal ref={consentModalRef} onSubmit={handleSubmit} />
          <DrawerFooter>
            <Button onClick={handleButtonClick} className="btn-primary">
              동의하고 시작하기
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
