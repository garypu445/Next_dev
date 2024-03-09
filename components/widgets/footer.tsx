'use client'

import { useTranslation } from 'react-i18next';


export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-accent py-4">
      <div className="container mx-auto lg:mx-auto 3xl:container-3xlo">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col">
              <div>
                <span>{t('footer_about')}</span>
              </div>
              <div className="flex flex-row" style={{ color: "white" }}>
                <div>查詢</div>
                <div>查詢</div>
                <div>查詢</div>
                <div>查詢</div>
              </div>
            </div>
            <div className="">05</div>
          </div>
          <div className="font-bold" style={{ color: "white" }}>
            <span>Copyright © SUOTOO All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
