export default function DummyCard() {
  return (
    <>
      <div className="card rounded-none w-96 bg-base-200 shadow-xl ">
        <div className=" bg-base-100 m-4">
          <figure className="px-10 pt-10">
            <img
              src="https://www.frontlist.in/storage/post/1653642722_photo-1630343710506-89f8b9f21d31.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
