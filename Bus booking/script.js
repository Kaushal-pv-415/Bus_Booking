document.addEventListener('DOMContentLoaded', function () {
    const seatContainer = document.getElementById('seatSelection');
    const seats = [];
    const rows = 5;
    const cols = 4;
    
    // Generate seat layout
    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('seat-row');
        for (let j = 0; j < cols; j++) {
            const seat = document.createElement('button');
            seat.classList.add('seat');
            seat.textContent = `${String.fromCharCode(65 + i)}${j + 1}`;
            seat.addEventListener('click', function () {
                seat.classList.toggle('selected');
                updateSelectedSeats();
            });
            rowDiv.appendChild(seat);
        }
        seatContainer.appendChild(rowDiv);
    }

    function updateSelectedSeats() {
        seats.length = 0;
        document.querySelectorAll('.seat.selected').forEach(seat => {
            seats.push(seat.textContent);
        });
        document.getElementById('seats').value = seats.length;
    }

    document.getElementById('calculateCost').addEventListener('click', function () {
        const startPoint = document.getElementById('startPoint').value;
        const endPoint = document.getElementById('endPoint').value;
        if (!startPoint || !endPoint || seats.length === 0 || startPoint === endPoint) {
            alert('Please select valid start and end points, and at least one seat.');
            return;
        }

        const distanceCosts = {
            hyderabad: { visakhapatnam: 1500, chennai: 2000, bangalore: 1800 },
            visakhapatnam: { hyderabad: 1500, chennai: 1700, bangalore: 1900 },
            chennai: { hyderabad: 2000, visakhapatnam: 1700, bangalore: 1000 },
            bangalore: { hyderabad: 1800, visakhapatnam: 1900, chennai: 1000 }
        };

        const costPerSeat = distanceCosts[startPoint][endPoint];
        const totalCost = costPerSeat * seats.length;
        document.getElementById('totalCost').value = `₹${totalCost}`;
    });

    document.getElementById('bookingForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const startPoint = document.getElementById('startPoint').value;
        const endPoint = document.getElementById('endPoint').value;
        const totalCost = document.getElementById('totalCost').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (!totalCost) {
            alert('Please calculate the cost before booking.');
            return;
        }

        document.getElementById('displayName').textContent = userName;
        document.getElementById('displayPhone').textContent = phoneNumber;
        document.getElementById('displayStart').textContent = startPoint;
        document.getElementById('displayEnd').textContent = endPoint;
        document.getElementById('displaySeats').textContent = seats.join(', ');
        document.getElementById('displayCost').textContent = totalCost;
        document.getElementById('displayPayment').textContent = paymentMethod;

        document.getElementById('ticket').style.display = 'block';
        document.getElementById('bookingForm').reset();
        document.getElementById('totalCost').value = '';
        seats.length = 0;
        document.querySelectorAll('.seat').forEach(seat => seat.classList.remove('selected'));
    });
});
