/* If you're feeling fancy you can add interactivity */

// Quick Actions

function Setup(value){
    if (value == true){
      $.toast({
        heading: 'Success',
        text: 'Setup turned On',
        showHideTransition: 'slide',
        icon: 'success',
        position : 'top-right'
      })
    } else {
      $.toast({
        heading: 'Success',
        text: 'Setup turned Off',
        showHideTransition: 'slide',
        icon: 'success',
        position : 'top-right'
      })
    }
  }

// Devices functions
