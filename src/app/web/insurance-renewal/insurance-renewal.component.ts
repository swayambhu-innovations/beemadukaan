import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { PaymentService } from 'src/app/services/payment.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-insurance-renewal',
  templateUrl: './insurance-renewal.component.html',
  styleUrls: ['./insurance-renewal.component.css'],
})
export class InsuranceRenewalComponent implements OnInit {
  showData: boolean = false;
  renewalForm = new FormGroup({
    premiumNo: new FormControl('', [Validators.required]),
    registrationNo: new FormControl('', [Validators.required]),
  });
  result: any;
  policyData: any;
  WindowRef: any;
  recieptId:any;
  orderId: any;
  policyId:string;
  constructor(
    private dbService: DatabaseService,
    private dataProvider: DataProvider,
    private https: HttpClient,
    private alertify:AlertsAndNotificationsService,
    private paymentService: PaymentService,
  ) {}
  getPolicyData() {
    if (this.renewalForm.value.premiumNo != '') {
      document.querySelector('app-root')!.classList.add('noScroll');
      this.dataProvider.pageSetting.blur = true;
      this.dbService
        .getAllPolicy()
        .then((data: any) => {
          data.forEach((element: any) => {
            if (
              element.data().policyNumber == this.renewalForm.value.premiumNo
            ) {
              console.log('data', element.data());
              this.policyData = element.data();
              this.policyData.expiryDate = new Date(
                this.policyData.expiryDate
              ).toLocaleDateString();
              return false;
            } else {
              console.log('data', element.data());
              return true;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.showData = true;
          console.log(this.policyData);
          this.dataProvider.pageSetting.blur = false;
        });
    } else if (this.renewalForm.value.registrationNo != '') {
      this.dataProvider.pageSetting.blur = true;
      this.dbService
        .getAllPolicy()
        .then((data: any) => {
          data.forEach((element: any) => {
            if (
              element.data().registrationNo ==
              this.renewalForm.value.registrationNo
            ) {
              console.log('data', element.data());
              this.policyData = element.data();
              this.policyData.expiryDate = new Date(
                this.policyData.expiryDate
              ).toLocaleDateString();
              return false;
            } else {
              console.log('data', element.data());
              return true;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.showData = true;
          console.log(this.policyData);
          this.dataProvider.pageSetting.blur = false;
        });
    } else {
      alert('Please enter either policy number or registration number to continue');  
    }
    console.log(this.renewalForm.value);
  }
  allowRenewal(lastMonth: number, expiryDate: number) {
    let today = new Date();
    if (today >= new Date(lastMonth) && today <= new Date(expiryDate)) {
      return true;
    } else {
      return false;
    }
  }
  renewPolicy(event: any) {
    if (
      this.renewalForm.value.premiumNo != '' ||
      this.renewalForm.value.registrationNo != ''
    ) {
      if (
        confirm(
          'Are you sure you want to continue to payment for registration number ' +
            this.policyData.registrationNo
        )
      ) {
        this.dataProvider.pageSetting.blur = true;
        this.proceedPayment(event)
      }
    }
  }
  proceedPayment(event: any) {
    this.policyId = this.policyData.id;
    this.recieptId = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
    let orderDetails = {
      amount: this.policyData.toBePaidPremium * 100,
      receipt: this.recieptId,
    };
    this.createOrder(orderDetails).subscribe(
      (order) => {
        var rzp1 = new this.WindowRef.Razorpay(
          this.preparePaymentDetails(order, orderDetails)
        );
        rzp1.open();
        event.preventDefault();
      },
      (error) => {
        this.alertify.presentToast('Something went wrong from our side you can try again later.','error');
        this.dataProvider.pageSetting.blur = false;
      }
    );
  }
  preparePaymentDetails(order: any, orderDetails: any) {
    var ref = this;
    this.orderId = order.id;
    return {
      key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      name: 'Pay',
      currency: order.currency,
      order_id: order.id, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      image: 'https://beemadukaan.web.app/assets/images/logo-main.jpg',
      handler: function (response: any) {
        ref.handlePayment(response);
      },
      prefill: {
        name: this.policyData.name,
        email: this.policyData.email,
        contact: '+91' + this.policyData.mobileNumber,
      },
      theme: {
        color: '#002244',
      },
    };
  }
  handlePayment(response: any) {
    this.capturePayment({
      amount: this.policyData.toBePaidPremium * 100,
      payment_id: response.razorpay_payment_id,
    }).subscribe((res:any) => {
      // this.addBooking(this.currentOrderDetail);
      console.log("response",res,JSON.parse(res.body));
      this.dataProvider.pageSetting.blur = false;
      this.paymentPaid();
      this.dataProvider.showPaymentComplete = true;
      setTimeout(this.paymentPaid,3000);
      this.getPolicyData();
    });
  }
  get MainWindowRef() {
    return window;
  }

  createOrder(orderDetails: any) {
    // const data = this.paymentService.getOrder();
    // data(orderDetails).then((res: any) => {
    //   console.log('res', res);
    // });
    return this.https.post(
      environment.cloudFunctions.createOrder,
      orderDetails
    );
  }
  paymentPaid(){
    this.dbService.setPolicyAsAlreadyPaid(this.policyId).then((data:any)=>{
      this.getPolicyData();
      this.dataProvider.showPaymentComplete = false;
    })
  }
  capturePayment(paymentDetails: any) {
    return this.https.post(
      environment.cloudFunctions.capturePayment,
      paymentDetails
    );
  }
  ngOnInit(): void {this.WindowRef = this.MainWindowRef;}
}
