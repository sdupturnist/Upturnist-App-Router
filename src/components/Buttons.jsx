export default function Button({
    size = 'normal', // Default size
    label,
    icon,
    action,
    classes,
    showLabel,
    customIcon
}) {
    // Determine button size classes
    let sizeClass;
    switch (size) {
        case 'small':
            sizeClass = 'btn-small'; // Define your small button styles
            break;
        case 'normal':
        default:
            sizeClass = 'btn-normal'; // Define your normal button styles
            break;
    }

    return (
        <>
            <div 
          className={`btn-sc ${classes ? classes : ''}`}>
            <button 
                title={label}
                aria-label={label}
                type="button" 
                onClick={action}
                style={customIcon && { paddingLeft: '20px', paddingRight: '20px'  }} 
                
            >
                {showLabel === false ? null : label}


               {customIcon &&  <div className="size-[20px] flex items-center" dangerouslySetInnerHTML={{ __html: customIcon }} /> }
                
                {!customIcon && icon &&  (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="ml-[10px]" fill="none" viewBox="0 0 17 18">
                        <path stroke="url(#a)" strokeLinecap="round" strokeLinejoin="round" d="M8.5 1v16m8-8H.5" />
                        <defs>
                            <linearGradient id="a" x1="8.5" x2="8.5" y1="1" y2="17" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#fff" />
                                <stop offset="1" stopColor="#fff" stopOpacity=".7" />
                            </linearGradient>
                        </defs>
                    </svg>
                )}
            </button>
            </div>
        </>
    );
}
