function Button({ text, pressButton, onClick, type }) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`
        inline-block
        mt-10
        px-10
        py-4
        bg-blue-700 
        rounded-lg
        hover:translate-y-2 
        hover:[box-shadow:0_0px_0_0_#122456,0_0px_0_0_#1e3a8a]
        [box-shadow:0_10px_0_0_#1e3a8a]
        cursor-pointer
        transition-all 
        border-b-[1px] 
        border-blue-600
        ${pressButton ? "translate-y-2 [box-shadow:0_0px_0_0_#122456,0_0px_0_0_#1e3a8a] border-b-[0px]" : ""}
      `}>
        <span className="
          flex 
          flex-col 
          justify-center 
          items-center 
          text-white 
          font-bold 
          text-2xl
        ">
          {text}
        </span>
      </button>
  )
}

export default Button
