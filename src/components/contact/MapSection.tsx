'use client';
export const MapSection = () => {
    return (
        <section className="flex flex-col justify-center items-center md:flex-row gap-4">
            <div className="flex flex-col gap-6 items-center md:w-full max-w-[500px]">
                <h3 className="text-h2 text-gray-700">總部：825高雄市橋頭區橋都路98號</h3>
                <div className="w-full h-[300px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d717.2317861203229!2d120.30110042295784!3d22.73314937695716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e71cbab5b83b5%3A0x8cca97be6fde522e!2z5pm65YWG56eR5oqA5LyB5qWt5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1742721586792!5m2!1szh-TW!2stw"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <h3 className="text-h5 text-gray-700">台南分部：台南市新化區北勢里北勢11號</h3>
                </div>
            </div>

        </section>
    );
};
